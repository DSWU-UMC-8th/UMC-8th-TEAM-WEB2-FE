# UMC-8th-TEAM-WEB2-FE

> 추후 수정 예정


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
