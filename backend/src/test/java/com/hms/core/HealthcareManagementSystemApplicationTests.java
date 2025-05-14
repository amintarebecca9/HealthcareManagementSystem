package com.hms.core;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = HealthcareManagementSystemApplication.class,
		webEnvironment = SpringBootTest.WebEnvironment.NONE)
class HealthcareManagementSystemApplicationTests {

	/**
	 * Simply starting the Spring context should succeed.
	 */
	@Test
	void contextLoads() {
		// no-op: if the context fails to start, this test will error out
	}

	/**
	 * Running main() should not throw any exceptions.
	 */
	@Test
	void mainRunsSuccessfully() {
		HealthcareManagementSystemApplication.main(new String[]{});
	}
}
