// 이메일 유효성 검사
export const checkEmail = (email) => {
  let regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  // 형식에 맞는 경우 true 리턴
  return regExp.test(email);
};

//비밀번호 유효성 검사
export const checkPassword = (password) => {
  // 숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!
  var regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  return regExp.test(password);
};
