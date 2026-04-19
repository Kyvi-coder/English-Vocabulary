package vocabularyMain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vocabularyMain.entity.Topic;

import java.util.List;
import java.util.Optional;

public interface topic_dao extends JpaRepository<Topic, Integer> {
    Optional<Topic> findByName(String name);

    List<Topic> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);
}
