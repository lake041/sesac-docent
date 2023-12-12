package com.fred.docent.service;

import java.util.List;

import com.fred.docent.domain.FetchPostDetailsRequestDTO;
import com.fred.docent.domain.FetchPostDetailsResponseDTO;
import com.fred.docent.domain.FetchPostsRequestDTO;
import com.fred.docent.domain.FetchPostsResponseDTO;
import com.fred.docent.domain.InsertPostDTO;
import com.fred.docent.domain.UpdatePostDTO;

public interface PostsService {

	void insertPost(InsertPostDTO postDTO);
	
	void updatePost(UpdatePostDTO postDTO);
	
	void deletePost(UpdatePostDTO postDTO);

	List<FetchPostsResponseDTO> fetchPosts(FetchPostsRequestDTO requestDTO);

	FetchPostDetailsResponseDTO fetchPostDetails(FetchPostDetailsRequestDTO requestDTO);
}
