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

    // 복호문 출력
    document.getElementById('decrypted_text').value = plain_text
}

// 팝업 창 닫기
$(function(){
    $('#close').click(function(){
        $('#popup').hide()
    })
})