package com.fred.docent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fred.docent.domain.CustomUser;
import com.fred.docent.domain.UserDTO;
import com.fred.docent.mapper.UserMapper;

@Service("detail")
public class CustomUserDetailService implements UserDetailsService {
	
	@Autowired
	private UserMapper mapper;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		UserDTO userDTO=mapper.read(username);
		
		// memberDTO�� User Ŭ������ ��� �޾Ƽ� ���� Ŭ������ �̿��ؼ� �����ؾ� �Ѵ�.
		
		return new CustomUser(userDTO);
	}

}
