package com.app.exception;

@SuppressWarnings("serial")
public class ApiException extends RuntimeException {
	public ApiException(String mesg) {
		super(mesg);
	}
}
