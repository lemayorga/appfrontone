export default interface ApiResponse<T>{
	errorMessage?: string;
	responseCode?: string;
	data?: T;
}