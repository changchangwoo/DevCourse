### 쿠버네티스 지속적 배포(CD) 방법

- 환경 준비
    - jenkins agent
    - kubernetes 클러스터
    - kubectl
    - docker
- 젠킨스 설치
- 필요 플러그인 설치
    - Kubernetes CLI
    - Docker
    - Pipeline
- 젠킨스 파이프라인 설정
    - 젠킨스에서 파이프라인 생성하고, 빌드, 패키징, 클러스터 배포 작업까지 설정
    
    ```jsx
    pipeline {
        agent any
    
        environment {
            DOCKER_REGISTRY = 'your-docker-registry'
            DOCKER_IMAGE = "${DOCKER_REGISTRY}/your-app:${env.BUILD_NUMBER}"
            KUBE_CONFIG = credentials('kubeconfig') // 젠킨스 자격 증명을 통해 Kubeconfig 관리
        }
    
        stages {
            stage('Checkout') {
                steps {
                    git 'https://github.com/your-repo/your-project.git'
                }
            }
            stage('Build') {
                steps {
                    echo 'Building application...'
                    sh 'mvn clean install'
                }
            }
            stage('Docker Build & Push') {
                steps {
                    script {
                        docker.build(DOCKER_IMAGE).push()
                    }
                }
            }
            stage('Deploy to Kubernetes') {
                steps {
                    withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                        sh 'kubectl apply -f k8s/deployment.yaml'
                    }
                }
            }
        }
    }
    
    ```
    
- 쿠버네티스 배포 파일 작성
    - yaml 파일을 작성하여 배포할 애플리케이션에 대한 설정 정의
- 젠킨스 credential 설정
- kubernetes 클러스터에 접근하기 위한 kubeconfig 파일 자격 증명을 통해 설정
    - 젠킨스 관리 페이지 이동
    - 자격 증명 이동
    - 적절한 스코프 선택한 후 파일 자격 증명 추가
    - kubeconfig 파일 업로드 및 ID 설정
- 파이프라인 실행
    - 소스코드 체크아웃 > 애플리케이션 빌드 > docker 이미지 빌드 및 레지스트리 푸시 > kubernetes 클러스터에 애플리케이션 배포 등의 파이프라인 단계에 따라 동작