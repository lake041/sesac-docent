package com.fred.docent.domain;

import java.util.Date;
import lombok.Data;

@Data
public class FetchArtCollectionResponseDTO {
    // Gallery
    private Long gallery_id;
    private String gallery_name;
    private String gallery_location;
    private String gallery_number;
    private Integer gallery_valid;
    private String gallery_img;  // ���� �߰��� �ʵ�

    // Exhibitions
    private Long exhibition_id;
    private String exhibition_name;
    private String exhibition_description;
    private Date exhibition_start_date;
    private Date exhibition_end_date;
    private Integer exhibition_valid;
    private String exhibition_img;  // ���� �߰��� �ʵ�

    // Author
    private Long author_id;
    private String author_name;
    private String author_picture;
    private String author_description;
    private String author_email;
    private String author_instagram;
    private String author_img;  // ���� �߰��� �ʵ�

    // Work
    private Long work_id;
    private String work_name;  // ����� �ʵ� �̸�
    private String work_description;
    private String work_year;  // ���۳⵵
    private String work_size;
    private Integer work_valid;  // ���� �߰��� �ʵ�
    private String work_img;  // ���� �߰��� �ʵ�
}
