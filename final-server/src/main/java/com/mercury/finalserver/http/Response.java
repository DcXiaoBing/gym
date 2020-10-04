package com.mercury.finalserver.http;

public class Response {
    private boolean success;
    private int code;
    private String message;

    // a object points to all possible data.
    // USE_STATIC_TYPING(false), jackson will use dynamic type
    // Can use to carry User, UserDetail
    private Object data; 

    public Response() {
		super();
	}
	
	public Response(boolean success) {
		super();
		this.success = success;
		this.code = success ? 200 : 400;
		this.message = "";
	}
	
	public Response(boolean success, String message) {
		super();
		this.success = success;
		this.code = success ? 200 : 400;
		this.message = message;
    }
    public Response(boolean success, Object data) {
		super();
		this.success = success;
		this.code = success ? 200 : 400;
        this.message = "";
        this.data = data;
    }

    public Response(boolean success, int code, String message) {
		super();
		this.success = success;
		this.code = code;
		this.message = message;
    }
    public Response(boolean success, int code, String message, Object data) {
		super();
		this.success = success;
		this.code = code;
        this.message = message;
        this.data = data;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Response [code=" + code + ", data=" + data + ", message=" + message + ", success=" + success + "]";
    }
}