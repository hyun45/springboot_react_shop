import React, { Dispatch, SetStateAction } from 'react';
import './style.css';

// interface: 페이지네이션 컴포넌트 properties
interface Props{
    currentPage: number;
    currentSection: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    setCurrentSection: Dispatch<SetStateAction<number>>;
    viewPageList: number[];
    totalSection: number;
}

// component: 페이지네이션 컴포넌트
export default function Pagination(props: Props) {

// state: properties
    const {currentPage, currentSection, viewPageList, totalSection} = props;
    const {setCurrentPage, setCurrentSection} = props;

// event handler: 페이지 클릭 이벤트 처리
    const onPageClickHandler = (page: number) => {
        setCurrentPage(page);
    };

// event handler: 이전 클릭 이벤트 처리
    const onPreviousClickHandler = () => {
        if(currentSection === 1) return;
        setCurrentPage((currentSection - 1) * 10);
        setCurrentSection(currentSection - 1);
    };

// event handler: 다음 클릭 이벤트 처리
    const onNextClickHandler = () => {
        if(currentSection === totalSection) return;
        setCurrentPage(currentSection * 10 + 1);
        setCurrentSection(currentSection + 1);
    };

// render: 페이지네이션 컴포넌트 렌더링
    // return (
    //     <div id='pagination-wrapper'>
    //         <div className='pagination-change-link-box'>
    //             <div className='icon-box-small'>
    //                 <div className='icon left-icon'></div>
    //             </div>
    //             <div className='pagination-change-link-text' onClick={onPreviousClickHandler}>{'이전'}</div>
    //         </div>
    //         <div className='pagination-divider'>{'\|'}</div>

    //         {viewPageList.map(page => 
    //         page === currentPage ? 
    //         <div className='pagination-text-active'>{page}</div> :
    //         <div className='pagination-text' onClick={() => onPageClickHandler(page)}>{page}</div>
    //         )}

    //         <div className='pagination-divider'>{'\|'}</div>
    //         <div className='pagination-change-link-box'>
    //             <div className='pagination-change-link-text' onClick={onNextClickHandler}>{'다음'}</div>
    //             <div className='icon-box-small'>
    //                 <div className='icon right-icon'></div>
    //             </div>
    //         </div>
    //     </div>
    // )
    return (
        <div className='flex gap-5'>
            <div className='flex items-center gap-1 cursor-pointer'>
                <div className='w-4 h-4 flex items-center justify-center'>
                    <div className='w-full h-full bg-center bg-100% bg-left-icon'></div>
                </div>
                <div className='text-black text-opacity-70 text-[16px] font-normal leading-140%' onClick={onPreviousClickHandler}>{'이전'}</div>
            </div>
            <div className='text-black text-opacity-20 text-[16px] font-normal leading-140% cursor-default'>{'\|'}</div>

            {viewPageList.map(page => 
            page === currentPage ? 
            <div className='text-black text-[16px] font-semibold leading-140% cursor-default'>{page}</div> :
            <div className='text-black text-opacity-50 text-[16px] font-normal leading-140% cursor-pointer' onClick={() => onPageClickHandler(page)}>{page}</div>
            )}

            <div className='text-black text-opacity-20 text-[16px] font-normal leading-140% cursor-default'>{'\|'}</div>
            <div className='flex items-center gap-1 cursor-pointer'>
                <div className='text-black text-opacity-70 text-[16px] font-normal leading-140%' onClick={onNextClickHandler}>{'다음'}</div>
                <div className='w-4 h-4 flex items-center justify-center'>
                    <div className='w-full h-full bg-center bg-100% bg-right-icon'></div>
                </div>
            </div>
        </div>
    )
}
