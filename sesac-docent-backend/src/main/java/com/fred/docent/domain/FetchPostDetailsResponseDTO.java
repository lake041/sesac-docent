package com.fred.docent.domain;

import java.util.Date;
import lombok.Data;

@Data
public class FetchPostDetailsResponseDTO {

    // 공통 필드
    private Long postId;
    private String userName;
    private Integer postValid;
    private String postTitle;
    private String postContent;
    private Integer postViews;
    private Date postCreatedAt;
    private Date postUpdatedAt;

    // 카테고리 2 전용 필드
    private String exhibitionName;
    private String exhibitionDescription;
    private Date exhibitionStartDate;
    private Date exhibitionEndDate;
    private Integer exhibitionValid;
    private String exhibitionUrl;
    private Integer postLikes;

    // 카테고리 3 전용 필드
    private String replyUserName;
    private Integer replyPostValid;
    private String replyPostTitle;
    private String replyPostContent;
    private Date replyPostCreatedAt;

}
