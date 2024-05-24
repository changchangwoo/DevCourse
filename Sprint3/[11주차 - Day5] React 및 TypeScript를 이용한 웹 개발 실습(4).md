### 클래스 컴포넌트 및 함수 컴포넌트

- 컴포넌트
    - 리액트에서 사용되는 함수의 종류
    - 리액트는 컴포넌트 기반 구조의 특징
    - 모든 페이지가 컴포넌트로 구성되어있고 컴포넌트의 조합으로 컴포넌를 구성 가능
    - 블록을 조립하듯 새로운 컴포넌트의 구현이 가능
    - 가독성을 위해 컴포넌트는 모듈화를 통해 접근
- 클래스 컴포넌트
    - React 초기에 사용되던 형식
    - 생성자, 상태, 렌더링 메서드 등으로 구성
    
    ```jsx
    import React, { Component } from 'react';
    
    class Greeting extends Component {
      constructor(props) {
        super(props);
        this.state = {
          name: 'World'
        };
      }
    
      render() {
        return (
          <div>
            <h1>Hello, {this.state.name}!</h1>
            <button onClick={this.handleChangeName}>Change Name</button>
          </div>
        );
      }
    
      handleChangeName = () => {
        this.setState({
          name: 'React'
        });
      };
    }
    
    export default Greeting;
    ```
    
- 함수형 컴포넌트
    - 더 간결하고 쉬운 현대적인 정의 방식
    - react hook을 사용해 라이프사이클 기능과 state 기능을 구현할 수 있는 형식

```jsx
import React, { useState } from 'react';

const Greeting = () => {
  const [name, setName] = useState('World');
  const handleChangeName = () => {
    setName('React');
  };

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <button onClick={handleChangeName}>Change Name</button>
    </div>
  );
};

export default Greeting;
```

- 클래스형 및 함수형 비교
    - 클래스형 컴포넌트보다 함수 컴포넌트가 선언하기 편함 ⇒ 코드가 짧음
    - 함수 컴포넌트가 메모리 자원 덜 사용하고 빌드 후 파일 크기가 더 작음
    - 함수 컴포넌트 render()함수가 필요 없어 마운트 속도가 더 빠름
    - 그냥 함수형 컴포넌트 쓰자

### state

- state
    - 리렌더링 트리거 역할을 하는 컴포넌트에서의 변수
    - useState 함수의 첫번째 인덱스 반환값 **`useState`**는 상태 변수와 해당 상태를 업데이트할 수 있는 함수를 반환
    - **`state`**는 컴포넌트 내부에서 관리되며, 직접 수정할 수 없음. 대신 **`setState`** (클래스 컴포넌트) 또는 상태 업데이트 함수 (함수형 컴포넌트)를 사용하여 상태를 업데이트
    
    ```jsx
    import React, { useState } from 'react';
    
    const Counter = () => {
      const [count, setCount] = useState(0);
      const increment = () => {
        setCount(count + 1);
      };
    
      return (
        <div>
          <p>Current count: {count}</p>
          <button onClick={increment}>Increment</button>
        </div>
      );
    };
    
    export default Counter;
    ```
    

### 데이터 반복 처리

- 리스트 반복 처리
    
    ```jsx
    import React from 'react';
    
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' }
    ];
    
    const UserList = () => {
      return (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      );
    };
    
    export default UserList;
    ```
    
    - 중괄호로 구분하여 JS 코드의 MAP 함수 사용
    - map 함수는 배열의 각 요소를 하나씩 가져와 요소의 값을 이용하거나 수정, 모든 요소들을 배열 형태로 반환
    - 원본 배열을 변경하지 않으며, 새로운 배열을 생성 **`map`** 함수는 주로 배열의 요소들을 변환하거나 가공할 때 사용
    - 리스트 key값
        - 렌더링 시 컴포넌트 배열에 변화가 일어났는지 빠르게 알아내기 위한 속성

### 이벤트 처리

```jsx
import React, { useState } from 'react';

const InputExample = () => {
  const [inputValue, setInputValue] = useState('');
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      <p>Current Input: {inputValue}</p>
    </div>
  );
};

export default InputExample;

```

- onchange 핸들러를 통해 input 값에 변화가 생기면 handleChange 함수가 동작
- 입력받은 값을 settter 함수를 통해 inputValue 상태 변화
- 변화된 상태가 즉각 UI에 리렌더링 되어 화면에 반영