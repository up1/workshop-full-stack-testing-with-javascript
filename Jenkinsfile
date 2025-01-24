pipeline {
    agent {
        label 'node01'
    }

    stages {
        stage('Check new code in main branch') {
            steps {
                git branch: 'main', url: 'https://github.com/up1/workshop-full-stack-testing-with-javascript.git'
            }
        }
        stage('Setup database') {
            steps {
                sh '''docker compose down
                docker compose up -d postgres'''
            }
        }
        stage('Deploy Backend') {
            steps {
                sh '''export BACKEND_PORT=5001
                docker compose up -d backend --build'''
            }
        }
        stage('Backend testing') {
            steps {
                sh '''rm -rf postman-test-report/
                docker compose up backend_test --abort-on-container-exit --build'''
            }
        }
        stage('Deploy Frontend') {
            steps {
                sh '''export FRONTEND_PORT=3001
                docker compose up -d frontend --build'''
            }
        }
        stage('Frontend testing with playwright') {
            steps {
                sh '''rm -rf frontend-test-report/
                docker compose up frontend_test --abort-on-container-exit --build'''
            }
        }
    }
    post {
        always {
            junit stdioRetention: '', testResults: 'postman-test-report/*.xml'
            junit testResults: 'frontend-test-report/*.xml'
        }
    }  
}