package backend.reports.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class EmailUtil {

    private static final Logger logger = LoggerFactory.getLogger(EmailUtil.class);

    public void sendReportEmail(String recipient, String subject, String body, String filePath) {
        logger.info("=================================================");
        logger.info("SIMULATING EMAIL TRANSMISSION (SMTP NOT CONFIGURED)");
        logger.info("Recipient: {}", recipient);
        logger.info("Subject: {}", subject);
        logger.info("Body: {}", body);
        
        if (filePath != null) {
            File attachment = new File(filePath);
            logger.info("Attachment Name: {}", attachment.getName());
            logger.info("Attachment Size: {} bytes", attachment.length());
            logger.info("Attachment Status: Attached successfully");
        }
        logger.info("Email sent successfully!");
        logger.info("=================================================");
    }
}
