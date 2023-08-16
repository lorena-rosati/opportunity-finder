export const useGetUserID = () => {
    return window.localStorage.getItem("userID"); //retrieves the user ID stored in local storage
}