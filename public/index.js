// 불러오기
$(function() {
    $('#loading').click(function(){
        $('#popup').show()
    })
})

const setPassword_plate = new Set()

// 암호화
function result_password(){
    let encryption_key = document.getElementById('encryption_key').value
    let plain_text = document.getElementById('plain_text').value

    encryption_key = encryption_key.toLowerCase()
    plain_text = plain_text.toLowerCase()

    // 암호화를 위한 조건
    if(encryption_key === '')
        alert('암호키를 입력하세요')

    if(plain_text === '')
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
            if(password_plate[i] === 'q')
                document.getElementById('p' + (i + 1)).value = password_plate[i] + '/z'
            else
                document.getElementById('p' + (i + 1)).value = password_plate[i]
        }

        // 평문 공백 제거
        let x1, x2, y1, y2, password = ''
        plain_text = plain_text.replace(/(\s*)/g, "")


        for(let i = 0; i < plain_text.length - 1; i += 2){
            if(plain_text[i] === plain_text[i + 1])
                plain_text = plain_text.slice(0, i + 1) + 'x' + plain_text.slice(i + 1)
        }

        if(plain_text.length % 2 != 0)
            plain_text += 'x'

        // 암호문 생성
        for(let i = 0; i < plain_text.length - 1; i += 2){
            x1 = password_plate.indexOf(plain_text[i]) / 5 | 0
            y1 = password_plate.indexOf(plain_text[i]) % 5

            x2 = password_plate.indexOf(plain_text[i + 1]) / 5 | 0
            y2 = password_plate.indexOf(plain_text[i + 1]) % 5

            // 같은 행
            if(x1 === x2)
                password += password_plate[x1 * 5 + (y1 + 1) % 5] + password_plate[x2 * 5 + (y2 + 1) % 5]

            // 같은 열
            else if(y1 === y2)
                password += password_plate[((x1 + 1) % 5) * 5 + y1] + password_plate[((x2 + 1) % 5) * 5 + y2]

            // 대각선
            else
                password += password_plate[x2 * 5 + y1] + password_plate[x1 * 5 + y2]

            password += ' '
        }

        document.getElementById('result').value = password
    }
}

// 복호화
function result_decrypted(){
    let encryption_key = document.getElementById('encryption_key').value
    let plain_text = document.getElementById('plain_text').value

    encryption_key = encryption_key.toLowerCase()
    plain_text = plain_text.toLowerCase()

    // 암호화를 위한 조건
    if(encryption_key === '')
        alert('암호키를 입력하세요')

    if(plain_text === '')
        alert('평문을 입력하세요')

    // 암호키 중복 제거
    else if(encryption_key != '' && plain_text != '') {
        const setEncryption_key = new Set()

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
            if(password_plate[i] === 'q')
                document.getElementById('p' + (i + 1)).value = password_plate[i] + '/z'
            else
                document.getElementById('p' + (i + 1)).value = password_plate[i]
        }

        // 평문 공백 제거
        let x1, x2, y1, y2, password = ''
        plain_text = plain_text.replace(/(\s*)/g, "")

        // 복호문 생성
        for(let i = 0; i < plain_text.length - 1; i += 2){
            x1 = password_plate.indexOf(plain_text[i]) / 5 | 0
            y1 = password_plate.indexOf(plain_text[i]) % 5

            x2 = password_plate.indexOf(plain_text[i + 1]) / 5 | 0
            y2 = password_plate.indexOf(plain_text[i + 1]) % 5

            // 같은 행
            if(x1 === x2)
                password += password_plate[x1 * 5 + (y1 + 4) % 5] + password_plate[x2 * 5 + (y2 + 4) % 5]

            // 같은 열
            else if(y1 === y2)
                password += password_plate[((x1 + 4) % 5) * 5 + y1] + password_plate[((x2 + 4) % 5) * 5 + y2]

            // 대각선
            else
                password += password_plate[x2 * 5 + y1] + password_plate[x1 * 5 + y2]

            password += ' '
        }

        document.getElementById('result').value = password
    }
}

// 저장하기
$(function(){
    $('#save').click(function(){
        // 저장하기 위한 조건
        if(document.getElementById('encryption_key').value == '')
            alert('암호키를 입력하세요')

        if(document.getElementById('plain_text').value == '')
            alert('평문을 입력하세요')

        else{
            const password = document.getElementById('encryption_key').value
            const password_plate = Array.from(setPassword_plate)

            console.log(password, password_plate)

            db.collection('password').doc(password).set({"암호키":password, "암호판":password_plate}).then(() => {
                alert('저장되었습니다.')
                // location.reload()
            })

        }
    })
})

// 선택한 암호키, 암호판 불러오기
function show_password(){
    let password = ''
    let password_plate = Array.from(setPassword_plate)

    db.collection('password').get().then((pw)=>{
        pw.forEach((doc)=> {
            password_plate = doc.data().암호판;
            password = doc.data().암호키;
            console.log(password, password_plate)
        })
    })

    document.getElementById('encryption_key').value = password

    for(let i = 0; i < 25; i++){
        document.getElementById('p' + (i + 1)).value = password_plate[i]
    }
}

// 팝업 창 닫기
$(function(){
    $('#close').click(function(){
        $('#popup').hide()
    })
})
