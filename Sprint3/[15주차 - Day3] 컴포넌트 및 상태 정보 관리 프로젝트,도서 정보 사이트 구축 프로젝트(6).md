### 리액트에서 Daum Post Code API 사용하기

```jsx
  const SCRIPT_URL = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"

  useEffect(()=>{
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);
    return () => {
        document.head.removeChild(script);
    }
  }, [])
```

- 다음과 같이 useEffect에서 수동으로 값을 넣어주고 해당하는 페이지를 나가게 되는 경우 script를 제거할 수 있다
- 자세한 코드 동작은 Daum Post Code API 사이트에서 제시하는 튜토리얼을 활용

```jsx
  const handleOpen = () => {
    new window.daum.Postcode({
        oncomplete: (data : any) => {
            onCompleted(data.address as string);
        }
    }).open();
  }
```

- 이렇게 하게 되는 경우 script에는 window.daum이 들어가지만 타입스크립트에서 winodow.daum을 인식하지 못하게 된다
- 따라서 수동으로 인식할 수 있도록 처리해줘야한다

```jsx
interface Window {
    daum : {
        Postcode : any
    }
}
```

- widnow.d.ts 파일에서 인터페이스를 설정할 수 있다

### 중간 정리

- 회고는 자주할 수록 좋다. 현재 진행 방향과 보완할 부분을 탐색할 수 있기 때문
    - 작업 중간에 하는 것도 좋다
- 회고를 하는 이유
    1. 성장과 학습
    2. 문제 해결
    3. 유연성과 적응성
    4. 퍼포먼스 향상
    
    ⇒ **“ 더 잘하기 위해 “**
    
- 주요 학습 주제

### 타입과 모델

- 미리 theme.ts에서 color항목을 colorKey를 통해 명시적으로 정해두어서 확장에서 올 수 있는 사이드 이펙트를 방지
    - Record를 통해서 반복하여 ColorKey를 효과적으로 지정할 수 있다
- [key in HeadingSize]와 같은 반복을 통해서 효율적으로 지정
- 타입 내 객체가 있는 경우 해당 객체를 분리해서 타입을 설정하는 방법도 고려
- <Pick> : 유틸리티, 미리 정의된 인터페이스에서 일부 Props만 사용할 수 있다
- <Omet> : 유틸리티, 미리 정의된 인터페이스에서 일부 Props만 제거해서 사용할 수 있다

⇒ 매번 별도의 인터페이스를 정의하는것보다 이렇게 활용할 수 있으면 때떄로 사용해서 정의할 수 있다

### 데이터 흐름

### 컴포넌트 구조

- 기본적인 템플릿 문법으로 반복문을 통한 컴포넌트 출력과 조건부에 따른 컴포넌트 출력은 기억을 해두는 것이 좋다

### 생산성

- 스니펫 사용 및 기능 단위 작업 흐름 파악
- 데이터 모델 정의 → 컴포넌트 생성 → 배치 → 1차 스타일링 → 데이터 패치/ 훅 → 이벤트 핸들러 → 추가 스타일링 → 리팩토링
- 자기만의 생산 루틴을 정립하면 효율적일 수 있다