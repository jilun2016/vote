package com.jlt.vote.util;

/**
 * 系统环境
 * @Author gaoyan
 * @Date: 2017/7/29
 */    
public enum SystemProfileEnum {

	/**
	 * 交易创建，等待买家付款
	 */
	DEVELOP("develop"),
	/**
	 * 未付款交易超时关闭，或支付完成后全额退款
	 */
	PRODUCT("product"),
	;

	private final String value;

	private SystemProfileEnum(final String value) {
		this.value = value;
	}
	
	public String value() {
		return this.value;
	}
}
