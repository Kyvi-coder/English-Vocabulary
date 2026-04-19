package vocabularyMain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vocabularyMain.entity.User;

import java.util.List;
import java.util.Optional;

public interface user_dao extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    List<User> findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(String username, String email);
}
