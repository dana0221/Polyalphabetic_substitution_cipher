// 불러오기
$(function() {
    $('#loading').click(function(){
        $('#popup').show()
    })
})

// 결과보기
function result_f(){
    let encryption_key = document.getElementById('encryption_key').value
    let plain_text = document.getElementById('plain_text').value

    // 암호화를 위한 조건
    if(encryption_key == '')
        alert('암호키를 입력하세요')

    if(plain_text == '')
        alert('평문을 입력하세요')

    // 암호키 중복 제거
    const setEncryption_key = new Set()
    const setPassword_plate = new Set()

    for(let i = 0; i < encryption_key.length; i++){
        setEncryption_key.add(encryption_key[i])

        // 암호키 암호판에 삽입
        setPassword_plate.add(encryption_key[i])
    }

    // 암호판 생성
    const arr = 'abcdefghijklmnopqrstuvwxy'

    for(let i = 0; i < 25 ; i++){
        setPassword_plate.add(arr[i])
    }

    // 암호판 출력
    const password_plate = Array.from(setPassword_plate)

    for(let i = 0; i < 25; i++){
        if(password_plate[i] == 'q')
            document.getElementById('p' + (i + 1)).value = password_plate[i] + '/z'
        else
            document.getElementById('p' + (i + 1)).value = password_plate[i]
    }

    // 암호문 출력


    // 복호문 출력
    document.getElementById('decrypted_text').value = plain_text
}

// 팝업 창 닫기
$(function(){
    $('#close').click(function(){
        $('#popup').hide()
    })
})