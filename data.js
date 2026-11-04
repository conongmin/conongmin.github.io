// 작품 내용은 이 파일만 고치면 사이트 전체에 반영됩니다.
// youtube 칸에 유튜브 영상 ID를 넣으면 사이트 영상 대신 유튜브 플레이어가 나옵니다.
window.PORTFOLIO = {
  name: "노호민",
  role: "VIDEO CREATOR",
  eyebrow: "기획부터 촬영, AI, 편집까지",
  lead: "메시지를 먼저 설계하고, 끝까지 직접 완성합니다",
  email: "nhm527@naver.com",
  results: [
    { big: "우수상", text: "제7회 하이라이트TV AI 공모전 숏폼 부문" },
    { big: "4일", text: "농협 추석 홍보 영상 2편, 의뢰부터 최종본까지" },
    { big: "재등록", text: "상담 메시지를 'PT 졸업' 제안으로 바꿔 다시 등록하는 회원을 만듦" }
  ],
  works: [
    {
      id: "dream", yt: "shorts/zmBVJskKwwg", title: "꿈꾸던 나, 곧 방송됩니다", badge: "우수상", kind: "AI 숏폼", ratio: "9:16", length: "31초",
      videos: [{ file: "dream", youtube: "" }],
      context: "제7회 하이라이트TV AI 공모전 숏폼 부문",
      result: "우수상",
      role: "기획, 콘티, AI 생성, 편집, 작품설명서 단독",
      tools: "Nano Banana, Kling v3 Pro, Gemini, Remotion",
      points: [
        "61초 광고의 소스를 다시 편집했습니다. 첫 프레임부터 얼굴과 회차 타이틀을 보여 주고, 3초 안에 컷을 세 번 넘겼습니다.",
        "평가 항목인 '로고 노출 방식의 참신성'에 맞춰, 로고를 버스 모니터와 네온 빗방울처럼 장면 속 사물과 빛으로 등장시켰습니다.",
        "쇼츠 화면에 가리지 않도록 자막 위치를 옮기고, 샷마다 인물을 세로 화면 가운데로 맞췄습니다."
      ]
    },
    {
      id: "varo", title: "바로피트니스 홍보 숏폼", badge: "직접 촬영", kind: "홍보 숏폼", ratio: "9:16", length: "50초",
      videos: [{ file: "varo", youtube: "" }],
      context: "헬스장 공간과 시설 소개",
      result: "제작 완료",
      role: "기획, 현장 촬영, 자막, 편집 단독",
      tools: "",
      points: [
        "첫 자막 '수지에서 운동할 곳을 찾는다면'으로 볼 사람을 먼저 불렀습니다.",
        "800평대 공간, 70종 이상의 머신처럼 숫자로 장점을 보여 주었습니다.",
        "공간 동선을 따라 장면을 구성해 직접 둘러보는 느낌을 만들었습니다."
      ]
    },
    {
      id: "culprit", yt: "shorts/-DLi2M10JgA", title: "범인은 이 안에 있다", badge: "공모전 출품", kind: "AI 숏폼", ratio: "9:16", length: "56초",
      videos: [{ file: "culprit", youtube: "" }],
      context: "나무엑스 AI 숏폼 공모전",
      result: "출품",
      role: "기획, 트렌드 분석, AI 생성, 나레이션, 편집 단독",
      tools: "Artlist (Nano Banana 2.1, Kling v3 Pro), Google AI Studio (Gemini TTS), Gemini (BGM), Claude, Premiere Pro",
      points: [
        "9~10월 SNS 트렌드와 밈을 먼저 정리했습니다.",
        "수명이 짧은 음원 대신 포맷의 구조를 빌려 기획했습니다.",
        "제품 제작 가이드에서 승인된 기능만 사용해 브랜드 조건을 지켰습니다.",
      ]
    },
    {
      id: "nh", title: "농협 추석 홍보 영상", badge: "외주", kind: "외주 편집", ratio: "9:16", length: "2편",
      videos: [{ file: "nh1", youtube: "" }, { file: "nh2", youtube: "" }],
      context: "수지농협·농협경제지주 공식 계정 채택용 제안 영상",
      result: "납품 완료 (의뢰 4일)",
      role: "컷 편집, 자막, BGM과 음향, 인트로, 모션 텍스트, 색감 조정, 구성안 제안 (원본과 대본은 클라이언트 제공)",
      tools: "Premiere Pro",
      points: [
        "마감일과 로고 사용 방식을 작업 전에 질문해 확인했습니다.",
        "대본이 1분을 넘자 품목을 나누는 구성안을 제시해 길이 기준을 합의했습니다.",
        "해석이 갈리는 인트로 요청은 2가지 버전으로 만들어 고르게 했습니다.",
        "클라이언트 반응: \"역대급인 거 같아요\", \"진짜 너무 감동입니다\""
      ]
    },
    {
      id: "firston", yt: "watch?v=2mueAWwCcVY", title: "상상했던 나, 오늘 첫 방송", badge: "AI 광고", kind: "AI 영상광고", ratio: "16:9", length: "61초",
      videos: [{ file: "firston", youtube: "" }],
      context: "제7회 하이라이트TV AI 공모전 영상광고 부문",
      result: "응모",
      role: "기획, 콘티, AI 생성, 편집, 작품설명서 단독",
      tools: "Nano Banana, Kling v3 Pro, Gemini, Remotion",
      points: [
        "상상 속의 나를 TV 프로그램의 '다음 화 예고'로 풀었습니다.",
        "제 사진으로 캐릭터 시트를 만들어 모든 컷의 얼굴을 고정하고, Kling v3 Pro의 영상 생성 단계에서 입 모양과 목소리를 함께 만들어 대사 장면에 그대로 사용했습니다.",
        "숏폼은 예고편, 이 광고는 본방이 되도록 두 편을 한 쌍으로 구성했습니다."
      ]
    },
    {
      id: "wear", title: "쓰고, 줄이고, 만나요", badge: "공익 숏폼", kind: "AI 3D 애니메이션", ratio: "9:16", length: "1분",
      videos: [{ file: "wear", youtube: "" }],
      context: "제44회 AI 교통안전 홍보작품 공모전 (한국도로교통공단)",
      result: "출품",
      role: "기획, 스토리보드, AI 생성, 편집 단독",
      tools: "Gemini, ChatGPT, Grok, Google AI Studio, Premiere Pro, After Effects",
      points: [
        "핵심 메시지: 안전장비는 사고 뒤의 기적이 아니라, 소중한 사람에게 돌아가기 위한 출발 전의 선택입니다.",
        "톤을 '유머, 경각심, 감동' 순서로 설계했습니다.",
        "13개 장면의 화면, 대사, 자막, 효과음을 초 단위로 나눈 스토리보드를 작성했습니다."
      ]
    },
    {
      id: "mayi", title: "May I, AI — 알고말고!", badge: "뮤직비디오", kind: "AI 뮤직비디오", ratio: "16:9", length: "39초",
      videos: [{ file: "mayi", youtube: "" }],
      context: "「모두의 프로듀서」 공모전",
      result: "출품",
      role: "기획, AI 생성, 타이포그래피, 편집 (음원과 캐릭터는 제공 자료)",
      tools: "Claude, Whisper, Nano Banana, Kling, Gemini TTS, Remotion",
      points: [
        "가사를 단어 단위로 받아 적어 시간을 재고, 컷과 타이포그래피를 가사에 맞췄습니다.",
        "키프레임 20여 장과 영상 11컷으로 완성했습니다."
      ]
    },
    {
      id: "choco", title: "Hot Choco", badge: "졸업작품", kind: "2D 애니메이션", ratio: "16:9", length: "58초",
      videos: [{ file: "choco", youtube: "" }],
      context: "대학교 졸업 발표 작품",
      result: "졸업 발표",
      role: "팀장, 기획, 제작 (3인 팀)",
      tools: "Premiere Pro, After Effects, Illustrator",
      points: ["겨울 카페의 토끼 이야기로 핫초코의 따뜻함을 전하도록 기획하고 제작했습니다."]
    },
    {
      id: "drink", title: "Drink the Chill, Feel the Thrill", badge: "인기상", kind: "3D 제품 광고", ratio: "16:9", length: "52초",
      videos: [{ file: "drink", youtube: "" }],
      context: "대학교 졸업 발표 작품",
      result: "졸업 발표 인기상",
      role: "팀장, 기획, 제작 (3인 팀)",
      tools: "Illustrator, Blender, Premiere Pro",
      points: ["제로 슈거 과일 음료의 맛별 라인업을 장면과 키 카피로 보여 주도록 기획하고 제작했습니다. 게임, 웹, 영상 8팀이 함께한 졸업 발표에서 인기상을 받았습니다."]
    }
  ],
  plans: [
    {
      title: "평가 기준에서 출발한 기획",
      from: "하이라이트TV AI 공모전",
      items: ["공모 요구를 주제, 창의성, AI 활용도, 로고 노출로 나눠 분석", "차별화 지점을 로고 노출 방식으로 결정", "장면 속 사물과 빛으로 로고 6회 등장"]
    },
    {
      title: "초 단위 스토리보드",
      from: "AI 교통안전 공모전",
      items: ["도입 00:00–00:15, 위기 00:15–00:25", "전환 00:25–00:35, 해결 00:35–01:00", "13개 장면을 화면, 대사, 자막, 효과음으로 작성"]
    },
    {
      title: "세무사 채널 연습 기획안",
      from: "실제 의뢰가 아닌 연습",
      items: ["첫 15초는 시청자의 상황으로 시작, 1분 안에 결론", "주제 예: 처음 종합소득세를 신고하는 프리랜서가 먼저 볼 것", "AI는 세금 흐름 자료 화면에만 활용"]
    }
  ],
  about: [
    "약 2년간 트레이너로 일하며 고객이 원하는 결과를 먼저 정하고, 그 과정을 단계로 보여 주는 방식으로 설득했습니다.",
    "지금은 같은 방식으로 영상을 만듭니다. 메시지를 정하고, 콘티로 설계하고, 촬영, AI 생성, 편집으로 완성합니다."
  ],
  skills: ["Premiere Pro", "After Effects", "Photoshop", "Illustrator", "Nano Banana", "Kling", "Grok", "Gemini", "ChatGPT", "Claude", "Remotion"]
};
