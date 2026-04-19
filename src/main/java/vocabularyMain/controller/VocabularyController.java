package vocabularyMain.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vocabularyMain.entity.Vocabulary;
import vocabularyMain.service.vocabularyService;

import java.util.List;

@RestController
@RequestMapping("/api/vocabulary")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class VocabularyController {
    private final vocabularyService vocabularyService;

    public VocabularyController(vocabularyService vocabularyService) {
        this.vocabularyService = vocabularyService;
    }

    @GetMapping
    public List<Vocabulary> getAllVocabulary() {
        return vocabularyService.getAllVocabulary();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vocabulary> getVocabularyById(@PathVariable int id) {
        return vocabularyService.getVocabularyById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Vocabulary> searchVocabulary(@RequestParam(required = false) String keyword) {
        return vocabularyService.searchVocabulary(keyword);
    }

    @GetMapping("/topic/{topicId}")
    public List<Vocabulary> getVocabularyByTopicId(@PathVariable int topicId) {
        return vocabularyService.getVocabularyByTopicId(topicId);
    }

    @PostMapping
    public ResponseEntity<Vocabulary> createVocabulary(@RequestBody Vocabulary vocabulary) {
        Vocabulary createdVocabulary = vocabularyService.createVocabulary(vocabulary);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdVocabulary);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vocabulary> updateVocabulary(@PathVariable int id, @RequestBody Vocabulary vocabulary) {
        try {
            return ResponseEntity.ok(vocabularyService.updateVocabulary(id, vocabulary));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVocabulary(@PathVariable int id) {
        try {
            vocabularyService.deleteVocabulary(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.notFound().build();
        }
    }
}
