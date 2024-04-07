## springboot_react_blog

www.hyuns.blog

## 개발환경
- Visual Studio Code
- Java 17
- MySQL 8.0
- spring boot 3.1.9 -> spring boot 2.7.9로 변경
- react(typescript)


## ERD
<img src="https://github.com/hyun45/springboot_react_shop/assets/159392652/6a6e9895-b724-48fc-88b8-1ff500534e0b" />

## View
CREATE VIEW board_list_view AS
SELECT 
    B.board_number AS board_number, 
    B.title AS title, B.content AS content, 
    I.image AS title_image, 
    B.favorite_count AS favorite_count, 
    B.reply_count AS reply_count, 
    B.view_count AS view_count, 
    B.write_datetime AS write_datetime, 
    B.writer_email AS writer_email,
    U.nickname AS writer_nickname, 
    U.profile_image AS writer_profile_image 
FROM board AS B INNER JOIN user AS U
ON B.writer_email = U.email
LEFT JOIN (SELECT board_number, ANY_VALUE(image) AS image FROM image GROUP BY board_number) AS I
ON B.board_number = I.board_number;


## Preview

<html>
<table>
  <tr>
    <th>
      회원가입 / 로그인
    </th>
  </tr>
  <tr>
    <td>
     <img src="https://github.com/hyun45/springboot_react_shop/assets/159392652/f1d23067-ea90-4d82-9aab-9dcde08941e5" />
    </td>
   </tr> 
  <tr>
    <th>
      프로필 수정
    </th>
  </tr>
  <tr>
    <td>
     <img src="https://github.com/hyun45/springboot_react_shop/assets/159392652/d0695bea-e393-4ca1-8a72-d22cb13317fa" />
    </td>
   </tr> 
  <tr>
    <th>
      게시글 작성
    </th>
  </tr>
  <tr>
    <td>
     <img src="https://github.com/hyun45/springboot_react_shop/assets/159392652/3d9d4ae3-27d3-4314-be0e-15c1dd413057" />
    </td>
   </tr>
  <tr>
    <th>
      게시글 수정
    </th>
  </tr>
  <tr>
    <td>
     <img src="https://github.com/hyun45/springboot_react_shop/assets/159392652/c4b632b4-0a3e-4afb-bf25-dc650c22a3ba" />
    </td>
   </tr>
  <tr>
    <th>
      게시글 삭제
    </th>
  </tr>
  <tr>
    <td>
     <img src="https://github.com/hyun45/springboot_react_shop/assets/159392652/3fca5464-232a-4d2c-8163-aeda1199f11e" />
    </td>
   </tr>
  <tr>
    <th>
      좋아요 / 댓글
    </th>
  </tr>
  <tr>
    <td>
     <img src="https://github.com/hyun45/springboot_react_shop/assets/159392652/f71e7bc4-8da2-4d63-84a3-11cb10b8648f" />
    </td>
   </tr>
   <tr>
    <th>
      다른 유저 프로필
    </th>
  </tr>
  <tr>
    <td>
     <img src="https://github.com/hyun45/springboot_react_shop/assets/159392652/ef777425-4bec-47a6-890b-3a1a6d6182ce" />
    </td>
  </tr>
   <tr>
    <th>
      검색 기능
    </th>
  </tr>
  <tr>
    <td>
     <img src="https://github.com/hyun45/springboot_react_shop/assets/159392652/c4b3211d-f11b-4034-9e96-1b36aa7608a2" />
    </td>
  </tr>
</table>
</html>
