import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, forwardRef } from 'react';
import './style.css';

// interface: Input Box 컴포넌트 properties
interface Props{
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error: boolean;
    icon?: 'eye-off-icon' | 'eye-on-icon' | 'expand-right-icon';  // 없을수도 있으므로 ? 사용
    onButtonClick?: () => void;
    message?: string;
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

// component: Input Box 컴포넌트
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {

// state: properties
const { label, type, placeholder, value, error, icon, message } = props;
const { onChange, onButtonClick, onKeyDown } = props

// event handler: input 키 이벤트 처리 함수
const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if(!onKeyDown) return;
    onKeyDown(event);
};

// render: Input Box 렌더링
    return (
        <div className='input-box'>
            <div className='input-box-label'>{label}</div>
            <div className={error ? 'input-box-container-error' : 'input-box-container'}>
                <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDownHandler}/>    {/* ref -> 엔터로 넘어가게 */}
                {onButtonClick !== undefined && (
                    <div className='icon-button' onClick={onButtonClick}>
                        {icon !== undefined && (
                            <div className={`icon ${icon}`}></div>
                        )}
                    </div>
                )}
            </div>
            {message !== undefined && (
                <div className='input-box-message'>{message}</div>
            )}
        </div>
    )
});

export default InputBox;