### 리액트란 무엇인가

- 자바스크립트 라이브러리 중 하나
- UI를 만들기 위해 페이스북에서 개발
- SPA 및 모바일 어플리케이션 개발 가능

### 리액트의 동작 원리

- 초기 랜더링
    - 애플리케이션의 초기 상태를 기반으로 실제 DOM을 처음 생성
- 가상 DOM 변경
    - 데이터 변경에 따라 가상 DOM에서 변화
- 재조정
    - 가상 DOM과 실제 DOM의 차이를 비교하여 변경 사항을 계산
- 실제 DOM 업데이트
    - 계산된 변경 사항을 실제 DOM에 반영

### 리액트 시작

```jsx
npx create-react-app my-app
cd my-app
npm start
```

- 해당 명령어를 통해 리액트 설치 및 실행 동작이 가능
- 강의에서는 CRA를 사용했지만, 현재 CRA는 권고되지 않는 방식(오래 걸리는 빌드)
- vite 방식으로 빌드하는것이 더욱 효과적이다

### JSX문법

- JSX (JavaScript XML) 문법은 React에서 사용되는 자바스크립트 확장 문법
- 자바스크립트 코드 안에서 HTML과 유사한 구문을 작성할 수 있음

```jsx
function App() {
return (
	<div className="root-Container">
	... 내용
	</div>
)
}
```

- 최상위 부모태그로 묶어야 한다
- 또는 Fragment 문법 <> </>를 통해 생략이 가능하다
- TSX(TypeScript with JSX) : JSX의 타입 체크

```jsx
const element = <h1>Hello, world!</h1>;

const name = "John";
const element = <h1>Hello, {name}!</h1>;

const element = <div className="container">Content goes here</div>;

```

- JSX에서는 html태그를 Javascript 코드 안에 사용이 가능하며
- 중괄호 `{}`를 통해 표현식의 삽입이 가능하다
- `class`대신 `className` 을 사용한다