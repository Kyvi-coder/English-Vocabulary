package vocabularyMain.service;

import org.springframework.stereotype.Service;
import vocabularyMain.entity.Topic;
import vocabularyMain.repository.topic_dao;

import java.util.List;
import java.util.Optional;

@Service
public class topicsService {
    private final topic_dao topicDao;

    public topicsService(topic_dao topicDao) {
        this.topicDao = topicDao;
    }

    public List<Topic> getAllTopics() {
        return topicDao.findAll();
    }

    public Optional<Topic> getTopicById(int id) {
        return topicDao.findById(id);
    }

    public Optional<Topic> getTopicByName(String name) {
        return topicDao.findByName(name);
    }

    public Topic createTopic(Topic topic) {
        return topicDao.save(topic);
    }

    public Topic updateTopic(int id, Topic topic) {
        Topic existingTopic = topicDao.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Topic not found with id: " + id));

        existingTopic.setName(topic.getName());
        existingTopic.setDescription(topic.getDescription());
        return topicDao.save(existingTopic);
    }

    public void deleteTopic(int id) {
        if (!topicDao.existsById(id)) {
            throw new IllegalArgumentException("Topic not found with id: " + id);
        }

        topicDao.deleteById(id);
    }

    public List<Topic> searchTopics(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllTopics();
        }

        String searchKeyword = keyword.trim();
        return topicDao.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(searchKeyword, searchKeyword);
    }
}
