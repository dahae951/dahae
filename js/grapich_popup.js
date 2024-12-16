$(document).ready(function () {
    var images = [];

    // .graphic_gy_item에서 이미지 데이터 추출하여 배열 생성
    $(".graphic_gy_item").each(function(index) {
        var imgSrc = $(this).find("img").attr("src");
        var descriptionText = $(this).find(".hover-overlay p").text();
        var popupSrc = $(this).find(".open-popup").data("image-src");

        images.push({
            src: popupSrc,
            description: descriptionText
        });
    });

    var currentIndex = -1;

    // open_popup 버튼 클릭 시 팝업 열기
    $(".open-popup").on("click", function(e) {
        e.preventDefault(); // 기본 동작 방지

        // 클릭된 버튼의 data 속성에서 이미지 src와 설명 텍스트 가져오기
        var imageSrc = $(this).data('image-src');
        var descriptionText = $(this).data('description');

        // 팝업 내용 설정
        $("#popup-image").attr("src", imageSrc);
        $("#popup-description").text(descriptionText);

        // 팝업 열기
        $(".popup-overlay").fadeIn();

        // 현재 인덱스를 설정
        currentIndex = images.findIndex(image => image.src === imageSrc);

        updateNavButtons();
    });

    // 팝업 닫기 버튼 클릭 시 팝업 닫기
    $(".popup-close").on("click", function() {
        $(".popup-overlay").fadeOut();
    });

    // 이전 버튼 클릭
    $(".prev-btn").on("click", function() {
        if (currentIndex > 0) {
            currentIndex--;
            updatePopupContent();
            updateNavButtons();
        }
    });

    // 다음 버튼 클릭
    $(".next-btn").on("click", function() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updatePopupContent();
            updateNavButtons();
        }
    });

    // 이미지 내용과 설명 업데이트
    function updatePopupContent() {
        var image = images[currentIndex];
        $("#popup-image").attr("src", image.src);
        $("#popup-description").text(image.description);
    }

    // 네비게이션 버튼 활성화/비활성화
    function updateNavButtons() {
        $(".prev-btn").prop("disabled", currentIndex === 0);
        $(".next-btn").prop("disabled", currentIndex === images.length - 1);
    }
});