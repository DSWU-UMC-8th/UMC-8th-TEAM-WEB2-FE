# UMC-8th-TEAM-WEB2-FE

> ## 인터넷 강의 리뷰&추천 서비스 💻✏️
>
> 덕성여대 UMC 8기 미니 프로젝트


> 추후 수정 예정



## ⚒️ 팀원 소개

|              김진효</br>[@jinhyo0](https://github.com/jinhyo0)               |               박소이</br>[@soyyyyy](https://github.com/soyyyyy)                |               김희윤</br>[@heeyun817](https://github.com/heeyun817)                |                김가빈</br>[@gcongK](https://github.com/gcongK)                |
| :------------------------------------------------------------------------------: | :------------------------------------------------------------------------------: | :------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
| <img src = "https://avatars.githubusercontent.com/u/150879545?v=4" width ="250"> | <img src = "https://avatars.githubusercontent.com/u/90364636?v=4" width ="250"> | <img src = "https://avatars.githubusercontent.com/u/90364739?v=4" width ="250"> | <img src = "https://avatars.githubusercontent.com/u/181479630?v=4" width ="250"> |
|                                   `메인/404페이지/nav/모달`                                    |                              `리뷰 등록`                              |                                      `강의별 리뷰`                                      |                                     `리뷰 목록`                                      |

<br/>

<br/>

## 🛠 기술 스택

| Category             | Stack                                                                                                                                                                                                                         |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Library              | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                                                                                                                           |
| Language             | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)                                                                                                             |
| Styling              | ![Tailwindcss](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)                                                                                                   |
| Data Fetching        | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white) ![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white) |
| Package Manager      | ![Pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)                                 
| Formatting & Linting | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)             |
| Version Control      | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)                            |
                                                                                                                      

<br/>


## 🎉Git Convention

### 📌 Git Flow
- `main branch` : 배포 브랜치
- `develop` branch` : 개발 브랜치, feature 브랜치가 merge됨
- `feature branch` : 페이지/기능 브랜치

### 🌟 Commit Message Convention (gitmoji 사용)
  - 🎉 **Init**: 프로젝트 세팅
  - ✨ **Feat**: 새로운 기능 추가
  - 🐛 **Fix** : 버그 수정
  - 💄 **Design** : CSS 등 사용자 UI 디자인 변경
  - ✏️ **Typing Error** : 오타 수정
  - 📝 **Docs** : 문서 수정
  - 🚚 **Mod** : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
  - 💡 **Add** : 파일 추가 (ex- 이미지 추가)
  - 🔥 **Del** : 파일 삭제
  - ♻️ **Refactor** : 코드 리팩토링
  - 🚧 **Chore** : 배포, 빌드 등 기타 작업
  - 🔀 **Merge** : 브랜치 병합
  - 형식: `커밋유형: 상세설명 (#이슈번호)`
  - ex) `🎉Init: 프로젝트 생성 (#1)`


### 🌳 Branch Convention
- 이슈 생성 후 브랜치 생성
- 형식: `브랜치종류/#이슈번호_상세기능`
- 브랜치 종류 -> ex) `init`, `feat`, `fix`
- ex) `feat/#1_mainPage`

### 📌 Flow
- `develop 브랜치`에서 새로운 브랜치를 생성.
- 작업을 완료하고 커밋 메시지에 맞게 커밋.
- Pull Request 생성
- `develop` 브랜치로 병합.
