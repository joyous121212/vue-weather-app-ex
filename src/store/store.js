import { createStore } from 'vuex';

// store 만들기
export default createStore({
    state: {
        // initail state
        count: 0,
        weatherData: {
            icon: 'icon',
            temp: 0,
            text: 'text',
            location: 'location',
            city: 'Seoul',
        }, 
        toggle: false, // true일때 about을 보여주기
    },
    mutations: {
        // mutations(데이터 변경)
        addCount(state, payload) {
            state.count += 1 + payload;
        },
        updateWeather(state, payload) {
            state.weatherData = payload;
            state.weatherData.icon = payload.weather[0].icon;
            state.weatherData.temp = payload.main.temp;
            state.weatherData.text = payload.weather[0].description;
            state.weatherData.location = payload.sys.country;
            state.weatherData.city = payload.name;
        },
        onSearchCity(state, payload) {
            state.weatherData.city = payload;
        },
        toggleButton (state) {
            state.toggle = !state.toggle;
        }
    },
    actions: {
        getWeather(context) {
            const API_KEY = import.meta.env.VITE_API_KEY;
            // context.state.변수명 -> context 객체를 통해 store 안에 있는 state 변수를 가져옴
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${context.state.weatherData.city}&appid=${API_KEY}`
            fetch(API_URL)
              .then(res => res.json()) // 받은 데이터 json으로 변환
              .then(data => {
                console.log(data); // 변환된 데이터 가져옴
                // mutation 함수로 날씨 정보 업데이트
                context.commit('updateWeather', data);
              })
              .catch(err => {
                alert('에러가 발생했습니다. 잠시 후 다시 시도해 주세요.')
              })
          }
    }
})