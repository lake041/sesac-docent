package com.fred.docent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fred.docent.domain.AuthDTO;
import com.fred.docent.domain.LoginDTO;
import com.fred.docent.domain.UserDTO;
import com.fred.docent.mapper.UserMapper;

@Service("UserService")
@Primary
@Transactional
public class UserService {

	@Autowired
	private UserMapper mapper;

	public boolean insert(UserDTO userDTO) throws Exception {
		boolean flag = mapper.insert(userDTO) == 1;
//		mapper.insert(userDTO.getEmail());
		return flag;
	}

	public boolean dupId(String userid) {
		return mapper.dupId(userid) == 0 ? true : false;
	}

	public void delete(UserDTO userDTO) {
		mapper.delete(userDTO.getEmail());
	}

	public void update(UserDTO userDTO) throws Exception {
		mapper.update(userDTO);
	}

	public UserDTO readUserByEmail(String email) {
		return mapper.readUserByEmail(email);
	};
	
	public UserDTO checkUser(String username, String email) {
		UserDTO user = mapper.checkUser(username, email);
        return user;
    }

}
