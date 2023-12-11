package com.fred.docent.mapper;

import org.apache.ibatis.annotations.Param;

import com.fred.docent.domain.UserDTO;

public interface UserMapper {
	// 회원가입
	public int insert(UserDTO userDTO);

	//public int insertAuth(String email);

	// 비밀번호 변경
	public void update(UserDTO userDTO) throws Exception;

	// 회원탈퇴
	public void delete(String email);

	// 중복아이디 검사
	public int dupId(String email);

	public UserDTO readUserByEmail(String email); // email로 멤버 정보 가져오기
	
	public UserDTO checkUser(@Param("username") String username, @Param("email") String email);
	
	public UserDTO read(String email); // 시큐리티 관련

}
