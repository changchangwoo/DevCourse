### DB 테이블 생성 실습

```bash
docker pull mariadb // 도커에게 마리아 db 설치 요청
docker run --name mariadb -d -p 3306:3306 --restart=always -e MYSQL_ROOT_PASSWORD=root mariadb
// 마리아 db 실행 및 설정 [3306 => 포트 넘버, MYSQL_ROOT_PASSWORD => DB 비밀번호]
docker exec -it mariadb /bin/bash // 마리아 db가 있는 컨테이너 접속
mysql -u root -p // 마리아 db 실행
```

- cmd 환경에서 docker 설치/접속 및 mysql 실행 ( [day9](https://www.notion.so/day9-8b9ec3f394a2459b9645c8b95ba96c61?pvs=21) )

1. “Board” 스키마 생성

   ```sql
   CREATE DATABASE Board;
   USE Board;
   ```

2. 사용자 테이블 생성

   ```sql
   CREATE TABLE users(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(30) NOT NULL,
   job VARCHAR(100),
   birth DATE, // SQL문법에서는 날짜를 입력받는 경우에 DATE 타입을 지원한다
   PRIMARY KEY(id) );
   ```

   - AUTO_INCREMENT 구문은 주로 고유 번호를 만들때 사용되며 레코드 값이 증가할 때 마다 값이 1씩 증가하는 값을 반환한다 ⇒ 따로 기입을 하지 않는다
   - SQL문법에서는 날짜를 입력받는 경우에 DATE 타입을 지원한다

3. 사용자 데이터 삽입

   ```sql
   INSERT INTO users (name, job, birth) VALUES ("gongu", "actor", "800123");
   ```

   - DATE 타입의 birth 컬럼에 “800123”을 기입 하더라도 “1980-01-23” 과 같은 형식으로 입력되어진다.

4. 게시글 테이블 생성

   ```sql
   CREATE TABLE posts(
   id INT NOT NULL AUTO_INCREMENT,
   title VARCHAR(100) NOT NULL,
   content VARCHAR(2000),
   created_at TIMESTAMP DEFAULT NOW(),
   PRIMARY KEY(id) );
   ```

   - TIMESTAMP NOW(current_timestamp())는 특수 레지스터로 현재 서버에서 SQL문이 실행될 떄의 날짜 시간 시계를 읽어 지정한다

5. 게시글 데이터 삽입

   ```sql
   INSERT INTO posts (title, content) VALUES ("title1", "content1");
   ```

   - cetrate_at 컬럼의 current_timstamp()는 따로 기입을 하지 않더라도 시스템대 정보 시계의 값을 입력받아 지정한다

6. 게시글 테이블에 수정일자 추가

   ```sql
   ALTER TABLE posts
   ADD COLUMN updated_at DATETIME
   DEFAULT NOW()
   ON UPDATE NOW();
   ```

   - posts 테이블을 변경하고 updated_at 이라는 datetime 형식의 새로운 컬럼을 추가한다
   - updated_at의 기본값을 현재 날짜와 시간으로 설정하고 updated_at 컬럼 값이 업데이트 될때마다 해당 값을 현재 시간으로 갱신한다 (= 수정 발생시 시간 업데이트 )

7. 게시글 테이블 ID2 수정

   ```sql
   UPDATE posts
   SET content = "updated!"
   WHERE id = 2;
   ```

   - posts에 id=2인 값에 content를 변경(업데이트) 했을 때, ON UPDATE NOW() 설정의 updated_at 컬럼은 값이 현재 시간(NOW)로 갱신되어진다

8. 게시글 테이블 작성자 컬럼 FK 추가

   ```sql
   ALTER TABLE posts
   ADD COLUMN user_id INT; // 현재 posts에 user_id 컬럼이 없어 추가를 한다

   ALTER TABLE posts
   ADD FOREIGN KEY(user_id)
   REFERENCES users(id); // 이후 user_id 테이블을 생성할 때
   // 유저 테이블에 id값과 일치하지 않는다면 오류가 생기게 된다
   ```

   - 외래키를 설정한 상태에서 user_id값을 입력하려면 연결된 참조키(users 테이블 내 id) 값이 있어야한다

9. **조인**

   - 데이터베이스를 연결하여 데이터를 검색하는 방법
   - PK 혹은 FK로 두 테이블을 연결
   - 적어도 하나의 컬럼은 서로 공유되고 있어야함

   ```sql
   SELECT * FROM posts LEFT
   JOIN users ON posts.user_id = users.id;
   ```

### MYSQL (mariadb) 날짜 / 시간 타입

- DATE
  - 날짜만
  - YYYY-MM-DD
- DATETIME
  - 날짜 + 시간
  - YYYY-MM-DD HH:MM:SS (24시간제)
- TIME
  - 시간
  - HH:MM:SS
- TIMESTAMP : 자동 입력
  - 날짜 + 시간
  - YYYY-MM-DD HH:MM:SS (24시간제)
  - Default 속성에 current_timeStamp() 값을 설정

### NOT NULL vs Default

- NOT Null
  - 명시적으로 값을 지정하지 않으면 오류발생
  - 직접 null 작성해서 넣는것도 허용하지 않음
- Default
  - 명시적으로 값을 지정하지 않으면 Default로 설정한 값이 입력되어짐
  - 직접 null을 작성해서 넣는다면 null이 삽입!
- NOT Null + Default
  - 명시적으로 지정하지 않으면 default 값 삽입이지만 Null 입력시 오류,
