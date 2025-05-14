package com.hms.service.impl;

import com.hms.dto.UserDto;
import com.hms.model.User;
import com.hms.repository.UserRepository;
import com.hms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;

    @Autowired
    public UserServiceImpl(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepo.findAll().stream()
                .map(UserDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"));
        return UserDto.fromEntity(user);
    }

    @Override
    public UserDto createUser(UserDto dto) {
        if (userRepo.existsByUsername(dto.getUsername())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Username already exists");
        }
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setRole(com.hms.model.User.Role.valueOf(dto.getRole()));
        user.setActive("Active".equals(dto.getStatus()));
        User saved = userRepo.save(user);
        return UserDto.fromEntity(saved);
    }

    @Override
    public UserDto updateUser(Long userId, UserDto dto) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"));
        user.setEmail(dto.getEmail());
        user.setRole(com.hms.model.User.Role.valueOf(dto.getRole()));
        user.setActive("Active".equals(dto.getStatus()));
        User updated = userRepo.save(user);
        return UserDto.fromEntity(updated);
    }

    @Override
    public void deleteUser(Long userId) {
        if (!userRepo.existsById(userId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "User not found");
        }
        userRepo.deleteById(userId);
    }
}

