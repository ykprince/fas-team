const KAKAO_JS_API_KEY = '3326588eea9b9c394fabf4e7e04844dd'
const KAKAO_REST_API_KEY = '64c03caa9a09908fc0881d45da8d4ef6'
const APP_NUMBER = '843935'
const CLIENT_ID = 'GiYMFwQrQqPk5SImUJQKi7mx0Rn9VFTU'
const DEV_REDIRECT_URI = 'http://localhost:8080/auth/callback'
const APP_ADMIN_KEY = '4a207740988ad4c0569275e6e3d00b08'
const KAKAO_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${DEV_REDIRECT_URI}&response_type=code`

export { KAKAO_JS_API_KEY, KAKAO_REST_API_KEY, DEV_REDIRECT_URI, APP_NUMBER, KAKAO_URI, CLIENT_ID, APP_ADMIN_KEY }
