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
    else if(encryption_key != '' && plain_text != '') {
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

        // 평문 공백 제거
        let x1, x2, y1, y2, password = '', decrypted = plain_text
        plain_text = plain_text.replace(/(\s*)/g, "")


        for(let i = 0; i < plain_text.length - 1; i += 2){
            if(plain_text[i] === plain_text[i + 1])
                plain_text = plain_text.slice(0, i + 1) + 'x' + plain_text.slice(i + 1)
        }

        if(plain_text.length % 2 != 0)
            plain_text += 'x'

        console.log(plain_text)

        // 암호문 생성
        for(let i = 0; i < plain_text.length - 1; i += 2){
            x1 = password_plate.indexOf(plain_text[i]) / 5 | 0
            y1 = password_plate.indexOf(plain_text[i]) % 5

            x2 = password_plate.indexOf(plain_text[i + 1]) / 5 | 0
            y2 = password_plate.indexOf(plain_text[i + 1]) % 5

            if(x1 == x2)
                password += password_plate[x1 * 5 + (y1 + 1) % 5] + password_plate[x1 * 5 + (y2 + 1) % 5]
            else if(y1 == y2)
                password += password_plate[((x1 + 1) % 5) * 5 + y1] + password_plate[((x2 + 1) % 5) * 5 + y2]
            else
                password += password_plate[x1 * 5 + y2] + password_plate[x2 * 5 + y1]

            password += ' '
        }

        // 암호문 출력
        document.getElementById('cryptogram').value = password

        // 복호문 출력
        document.getElementById('decrypted_text').value = decrypted
    }
}

// 팝업 창 닫기
$(function(){
    $('#close').click(function(){
        $('#popup').hide()
    })
})
