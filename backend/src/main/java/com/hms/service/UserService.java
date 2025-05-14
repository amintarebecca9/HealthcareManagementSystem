package com.hms.service;

import com.hms.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getAllUsers();
    UserDto getUserById(Long userId);
    UserDto createUser(UserDto dto);
    UserDto updateUser(Long userId, UserDto dto);
    void deleteUser(Long userId);
}
