export const waveStatusMap = {
    B: {
        statusText: '작업진행전',
        fields: []
    },
    P: {
        statusText: '작업진행중',
        userName: '-',
        fields: ['start_user_name', 'start_dt']
    },
    C: {
        statusText: '작업완료',
        fields: ['complete_user_name', 'start_dt', 'complete_dt']
    }
};

export const waveInfoFieldLabels = {
    start_user_name: '작업자',
    complete_user_name: '작업자',
    start_dt: '작업 시작 일시',
    complete_dt: '작업 완료 일시'
};