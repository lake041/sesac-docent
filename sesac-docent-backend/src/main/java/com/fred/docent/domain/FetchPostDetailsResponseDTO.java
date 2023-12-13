package com.fred.docent.domain;

import java.util.Date;
import lombok.Data;

@Data
public class FetchPostDetailsResponseDTO {

    // ���� �ʵ�
    private Long postId;
    private String userName;
    private Integer postValid;
    private String postTitle;
    private String postContent;
    private Integer postViews;
    private Date postCreatedAt;
    private Date postUpdatedAt;

    // ī�װ� 2 ���� �ʵ�
    private String exhibitionName;
    private String exhibitionDescription;
    private Date exhibitionStartDate;
    private Date exhibitionEndDate;
    private Integer exhibitionValid;
    private String exhibitionUrl;
    private Integer postLikes;

    // ī�װ� 3 ���� �ʵ�
    private String replyUserName;
    private Integer replyPostValid;
    private String replyPostTitle;
    private String replyPostContent;
    private Date replyPostCreatedAt;

}
