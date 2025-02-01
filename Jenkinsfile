pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "ganeshdocker123/playwright-tests"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/ganeshhubale/playwright-ts-tests.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:latest")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        docker.image("${DOCKER_IMAGE}:latest").push()
                    }
                }
            }
        }

        stage('Deploy Playwright Test Runner in Minikube') {
            steps {
                sh 'kubectl apply -f playwright-deployment.yaml'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    sh '''
                    kubectl wait --for=condition=ready pod -l app=playwright --timeout=120s
                    kubectl exec -it $(kubectl get pod -l app=playwright -o jsonpath="{.items[0].metadata.name}") -- npx playwright test --grep @others --project="UI - Chromium"
                    '''
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts 'test-results/*.png'
            junit 'test-results/*.xml'
        }
        success {
            echo '✅ Playwright tests passed!'
        }
        failure {
            echo '❌ Tests failed! Check logs.'
        }
    }
}
