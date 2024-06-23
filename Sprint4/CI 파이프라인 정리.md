### CI 파이프라인

- CI는 개발 코드 변경 사항을 정기적으로 병합하고 자동으로 빌드 및 테스트 하는 일련의 프로세스를 의미
- CI 과정을 자동화 하여 신속하게 통합-테스트 하도록 하는 것이 CI 파이프라인
- 코드 커밋 → 빌드 → 테스트 → 배포 순으로 동작

### 젠킨스를 통한 CI 파이프라인 활용

- 젠킨스 인터페이스 접속
- 초기 비밀번호 입력하여 계정 설정
- 필요한 플러그인 설치
- 젠킨스 대시보드 ‘새항목’
- ‘파이프라인’ 선택하고 지정
- Pipeline DSL을 사용하여 파이프라인 설정

```jsx
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                // 빌드 명령어 (예: mvn clean install)
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                // 테스트 명령어 (예: mvn test)
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // 배포 명령어 (예: scp, kubectl apply 등)
            }
        }
    }
}
 
```

- 깃허브와 연동해서 코드를 빠르게 감지 가능
- ‘빌드 나우’ 버튼을 통해 실행시키며 이를 젠킨스 웹 인터페이스를 통해 실시간 확인 가능