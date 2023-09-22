var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { 
    //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.557042, 127.034076), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 지도에 확대 축소 컨트롤을 생성
let zoomControl = new kakao.maps.ZoomControl();

// 지도의 우측에 확대 축소 컨트롤을 추가
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

const dataSet = [
	{
	  title: "24시센트럴동물메디컬센터",
	  address: "서울특별시 성동구 고산자로 207",
	  url: "https://www.youtube.com/watch?v=WpWFHhbokkE",
	  category: "병원",
	},
	{
	  title: "한양동물메디컬센터",
	  address: "서울특별시 성동구 왕십리로 282",
	  url: "https://hyamc.modoo.at/",
	  category: "병원",
	},
	{
		title: "버블퍼피",
		address: "서울 성동구 무학봉길 63 1층",
		url: "https://map.naver.com/p/entry/place/1107150322?c=15.00,0,0,0,dh",
		category: "용품샵",
	},
	{
		title: "아무도없개 왕십리역점",
		address: "서울 성동구 왕십리로 284-1 1층 103호",
		url: "https://www.youtube.com/watch?v=FBIN_MZ_Z0g",
		category: "용품샵",
	},
	{
		title: "피터펫츠",
		address: "경기 고양시 덕양구 대주로 358-78",
		url: "https://map.naver.com/p/entry/place/1002737150?c=15.00,0,0,0,dh",
		category: "운동장",
	  },
	{
		title: "포시즌",
		address: "경기 고양시 덕양구 흥도로 293 1층",
		url: "https://www.youtube.com/watch?v=-hQ4GUjzf1E",
		category: "운동장",
	},
	{
	  title: "오아오아",
	  address: "서울특별시 성동구 왕십리로6길 4-5 1층",
	  url: "https://maps.app.goo.gl/1zq9urx4NrWchUZt7?g_st=com.iwilab.KakaoTalk.Share",
	  category: "카페",
	},
	{
		title: "바우라움",
		address: "서울특별시 성동구 행당동 155-1",
		url: "https://www.youtube.com/watch?v=5BPNdUHS8Qk",
		category: "카페",
	},
	{
		title: "슈슈멍",
		address: "서울 성동구 왕십리로20길 38 1층",
		url: "https://www.youtube.com/watch?v=maok9_5RT10",
		category: "미용실",
	},
	{
		title: "슈슈댕",
		address: "서울 성동구 무학로 33 텐즈힐1단지 155동 1층 106호",
		url: "https://www.youtube.com/watch?v=maok9_5RT10",
		category: "미용실",
	},
	{
		title: "디어코코 강아지유치원&애견호텔",
		address: "서울 중구 동호로12길 88 1층, 2층",
		url: "https://map.naver.com/p/entry/place/1253111667",
		category: "유치원",
	},
	{
		title: "바우라움 강아지유치원",
		address: "서울 성동구 왕십리로 241 4층 바우라움",
		url: "https://www.youtube.com/watch?v=8105AKz58dU",
		category: "유치원",
	},
	{
		title: "어반독",
		address: "서울 성동구 왕십리로 410 센트라스j동133호",
		url: "https://map.naver.com/p/entry/place/1720516031?c=15.00,0,0,0,dh",
		category: "기타",
	},
	{
		title: "참약사 지안약국",
		address: "서울 성동구 왕십리광장로 17 비트플렉스(엔터식스) 4층 지안약국",
		url: "https://www.youtube.com/watch?v=IZThwVCXDPs",
		category: "기타",
	},
  ];

  // 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();
 
//주소-좌표 변환 함수
function getCoordsByAddress(address) {
	return new Promise((resolve, reject) => {
		// 주소로 좌표를 검색합니다
		geocoder.addressSearch(address, function(result, status) {
    		// 정상적으로 검색이 완료됐으면 
     		if (status === kakao.maps.services.Status.OK) {
        		var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
				resolve(coords);
				return;
    		}
			reject(new Error("getCoordsByAddress Error: not vaild Address")); 
		});
	});
}

setMap(dataSet);


function getContent(data) {

	let replaceUrl = data.url;
	let finUrl = "";
	replaceUrl = replaceUrl.replace("https://youtu.be/", "");
	replaceUrl = replaceUrl.replace("https://www.youtu.com/embed/", "");
	replaceUrl = replaceUrl.replace("https://www.youtu.com/watch?v=", "");
	replaceUrl = replaceUrl.replace("https://", "");
	finUrl = replaceUrl.split("&")[0];


	return `
	<div class="infowindow">
		<div class="infowindow-img-container">
			<img src="https://img.youtube.com/vi/${finUrl}/mqdefault.jpg">
		</div>
		<div class="infowindow-body">
	  		<h5 class="infowindow-title">${data.title}</h5>
	  		<p class="infowindow-address">${data.address}</p>
	  		<a href="${data.url}" class="infowindow-btn" target="_blank">자세히보기</a>
		</div>
  	</div>
  `;
}

async function setMap(dataSet) {
	for (var i = 0; i < dataSet.length; i ++) {
    	// 주소로 좌표를 검색
		let coords = await getCoordsByAddress(dataSet[i].address);
		var marker = new kakao.maps.Marker({
			map: map, // 마커를 표시할 지도
			position: coords, // 마커를 표시할 위치
		});

		markerArray.push(marker);

		// 마커에 표시할 인포윈도우를 생성 
		var infowindow = new kakao.maps.InfoWindow({
			content: getContent(dataSet[i]), // 인포윈도우에 표시할 내용
		});

		infowindowArray.push(infowindow);
	
		// 마커에 mouseover 이벤트와 mouseout 이벤트를 등록
		// 이벤트 리스너로는 클로저를 만들어 등록
		// for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록
		kakao.maps.event.addListener(
			marker, 
			'click', 
			makeOverListener(map, marker, infowindow, coords)
		);
		kakao.maps.event.addListener(
			map, 
			'click', 
			makeOutListener(infowindow)
		);
	}
}

// 인포윈도우를 표시하는 클로저를 만드는 함수
function makeOverListener(map, marker, infowindow, coords) {
    return function() {
		//1.클릭시 다른 인포윈도우 닫기
		closeInfoWindow();
        infowindow.open(map, marker);
		//2.클릭한 곳으로 지도 중심 옮기기
		map.panTo(coords);
    };
}

let infowindowArray = [];
function closeInfoWindow() {
	for (infowindow of infowindowArray) {
		infowindow.close();
	}
}

// 인포윈도우를 닫는 클로저를 만드는 함수
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}


//카테고리
const categoryMap = {
	hospital: "병원",
	shop: "용품샵",
	playground: "운동장",
	cafe: "카페",
	hairsalon: "미용실",
	school: "유치원",
	ets: "기타",
};

const categoryList = document.querySelector(".category-list");
categoryList.addEventListener("click", categoryHandler);

function categoryHandler(event) {
	const categoryId = event.target.id;
	const category = categoryMap[categoryId];

	//데이터분류
	let categorizedDataSet = [];
	for (let data of dataSet) {
		if (data.category === category) {
			categorizedDataSet.push(data);
		}
	}

	//기존 마커 삭제
	closeMarker();

	//기존 인포윈도우닫기
	closeInfoWindow();

	setMap(categorizedDataSet);
}

let markerArray = [];
function closeMarker() {
	for (marker of markerArray) {
		marker.setMap(null);
	}
}