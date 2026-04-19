package vocabularyMain.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vocabularyMain.entity.Topic;
import vocabularyMain.service.topicsService;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class TopicsController {
    private final topicsService topicsService;

    public TopicsController(topicsService topicsService) {
        this.topicsService = topicsService;
    }

    @GetMapping
    public List<Topic> getAllTopics() {
        return topicsService.getAllTopics();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Topic> getTopicById(@PathVariable int id) {
        return topicsService.getTopicById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Topic> searchTopics(@RequestParam(required = false) String keyword) {
        return topicsService.searchTopics(keyword);
    }

    @PostMapping
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
        Topic createdTopic = topicsService.createTopic(topic);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTopic);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Topic> updateTopic(@PathVariable int id, @RequestBody Topic topic) {
        try {
            return ResponseEntity.ok(topicsService.updateTopic(id, topic));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTopic(@PathVariable int id) {
        try {
            topicsService.deleteTopic(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.notFound().build();
        }
    }
}
