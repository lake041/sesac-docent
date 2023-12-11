package com.fred.docent.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fred.docent.domain.LoginDTO;
import com.fred.docent.domain.PasswordChangeDTO;
import com.fred.docent.domain.UserDTO;
import com.fred.docent.service.MailSendService;
import com.fred.docent.service.UserService;

import lombok.extern.log4j.Log4j;

@Log4j
@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService service;

	@Autowired
	private MailSendService mailService;

	@Autowired
	public BCryptPasswordEncoder encoder;

	// ȸ������
	@PostMapping("/insert")
	public ResponseEntity<String> insert(@RequestBody UserDTO dto) throws Exception {
		log.info("insert member " + dto.toString());

		String email = dto.getEmail();

		// �ߺ����̵� �˻�
		if (!service.dupId(email)) {
			Map<String, String> response = new HashMap<>();
			response.put("errorCode", "email");
			response.put("errorMessage", "�̹� �����ϴ� �̸����Դϴ�.");
			ObjectMapper objectMapper = new ObjectMapper();
			String json = objectMapper.writeValueAsString(response);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE).body(json);
		}

		// �̸��� ����
//	    String authCode = mailCheck(email);
//	    if (authCode == null || !authCode.equals(dto.getAuthCode())) {
//	        Map<String, String> response = new HashMap<>();
//	        response.put("errorCode", "auth");
//	        response.put("errorMessage", "�̸��� ������ �����Ͽ����ϴ�.");
//	        ObjectMapper objectMapper = new ObjectMapper();
//	        String json = objectMapper.writeValueAsString(response);
//	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//	                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE).body(json);
//	    }

		service.insert(dto);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/mailCheck/{email:.+}")
	@ResponseBody
	public String mailCheck(@PathVariable String email) {
		System.out.println("�̸��� ���� ��û�� ����!");
		System.out.println("�̸��� ���� �̸��� : " + email);
		return mailService.joinEmail(email);
	}

	// ȸ������ ����(��й�ȣ)
	@PostMapping("/update")
	public ResponseEntity<String> change(@RequestBody PasswordChangeDTO passwordChangeDTO) throws Exception {
	    log.info("change request ");
	    log.info("oldPassword: " + passwordChangeDTO.getOldPassword() + ", newPassword: " + passwordChangeDTO.getNewPassword());

	    String email = passwordChangeDTO.getEmail();  // JSON �����Ϳ��� email ���� �����ɴϴ�.
	    UserDTO dto = service.readUserByEmail(email);

	    if(dto != null && encoder.matches(passwordChangeDTO.getOldPassword(), dto.getPassword())) {
	        String encryptedPassword = encoder.encode(passwordChangeDTO.getNewPassword());
	        dto.setPassword(encryptedPassword);
	        service.update(dto);
	        return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"Success\"}");
	    }

	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Failed\"}");
	}



	// ȸ��Ż��
	@PostMapping("/delete")
	public ResponseEntity<Object> delete(@RequestBody UserDTO dto) {
	    if (dto.getEmail() != null && encoder.matches(dto.getPassword(), service.readUserByEmail(dto.getEmail()).getPassword())) {
	        service.delete(dto);
	        return ResponseEntity.ok().body("{\"message\": \"Success\"}");
	    }

	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"message\": \"Failed\"}");
	}


	// �α���
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO, HttpSession session) {
	    log.info("�α��� ��û " + loginDTO);

	    // �Է¹��� �̸��ϰ� ��й�ȣ�� DB���� ����� ������ �����ɴϴ�.
	    UserDTO userDTO = service.readUserByEmail(loginDTO.getEmail());

	    if (userDTO != null && encoder.matches(loginDTO.getPassword(), userDTO.getPassword())) {
	        // �̸��ϰ� ��й�ȣ�� ��ġ�ϴ� ���, �α��� ���� ó���� �մϴ�.
	        session.setAttribute("userDTO", userDTO);

	        // �α��� ���� �� Ȩ�������� �����̷�Ʈ�մϴ�.
	        return ResponseEntity.ok("{\"message\": \"Success\"}");
	    } else {
	        // �̸��ϰ� ��й�ȣ�� ��ġ���� �ʴ� ���, �α��� ���� ó���� �մϴ�.
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Failed\"}");
	    }
	}

	// �α��� ����
	@GetMapping("/login-error")
	public ResponseEntity<String> loginError() {
		String errorMessage = "���̵� ��й�ȣ�� Ȯ�����ּ���.";
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"" + errorMessage + "\"}");
	}
	
	// �α׾ƿ�
	@GetMapping(value = "/logout", produces = "application/json;charset=UTF-8")
	public ResponseEntity<String> logout(HttpSession session) {
		session.removeAttribute("email");
		String message = "�α׾ƿ� ��û";
		return new ResponseEntity<>(message, HttpStatus.OK);
	}
	
	// ��ť��Ƽ ���� ����
	@GetMapping("/access-denied")
	public ResponseEntity<String> accessDenied() {
		String errorMessage = "Access denied. You do not have permission to access this page.";
		return new ResponseEntity<>(errorMessage, HttpStatus.FORBIDDEN);
	}

	// ��й�ȣ ã��
	@PostMapping(value = "/findPassword", produces = "application/json;charset=UTF-8")
	public ResponseEntity<Map<String, Object>> findPassword(@RequestBody UserDTO dto) {
		String email = dto.getEmail();
		String username = dto.getUsername();

		// �Է��� ������ ��ġ�ϴ� ����ڸ� ��ȸ�մϴ�.
		UserDTO user = service.checkUser(username, email);

		Map<String, Object> response = new HashMap<>();
		if (user != null) {
			// ������ ��ġ�ϸ� ���� ������ �̵��մϴ�.
			response.put("message", "success");
			response.put("user", user);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			// ����ڰ� ���� ��� �˸��� ����ϰ� findPassword �������� �ٽ� �����ݴϴ�.
			response.put("error", "ȸ�� ������ Ȯ�����ּ���.");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}
	}

	// ��й�ȣ ���� ����������

}
