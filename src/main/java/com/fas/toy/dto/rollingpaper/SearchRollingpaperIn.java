package com.fas.toy.dto.rollingpaper;

import lombok.Data;

@Data
public class SearchRollingpaperIn {
  private int uid;

  public int getUid() {
		return this.uid;
	}

	public void setUid(int uid) {
		this.uid = uid;
	}

  @Override
  public String toString() {
    return "{" +
      " uid='" + uid + "'" +
      "}";
  }
}
