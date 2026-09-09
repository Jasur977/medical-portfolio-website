package org.example.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DatabaseConfig {

    @Value("${spring.datasource.url:jdbc:postgresql://localhost:5432/websited}")
    private String datasourceUrl;

    @Value("${spring.datasource.username:postgres}")
    private String datasourceUsername;

    @Value("${spring.datasource.password:postgres}")
    private String datasourcePassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();

        // Check if Render / Cloud style DATABASE_URL environment variable is present
        String renderDbUrl = System.getenv("DATABASE_URL");
        String effectiveUrl = (renderDbUrl != null && !renderDbUrl.trim().isEmpty()) ? renderDbUrl : datasourceUrl;

        if (effectiveUrl.startsWith("postgres://") || effectiveUrl.startsWith("postgresql://")) {
            try {
                // Parse URI of format postgres://user:password@host:port/dbname
                URI uri = new URI(effectiveUrl);
                String host = uri.getHost();
                int port = uri.getPort() == -1 ? 5432 : uri.getPort();
                String path = uri.getPath();
                String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;
                config.setJdbcUrl(jdbcUrl);

                if (uri.getUserInfo() != null) {
                    String[] userInfo = uri.getUserInfo().split(":");
                    config.setUsername(userInfo[0]);
                    if (userInfo.length > 1) {
                        config.setPassword(userInfo[1]);
                    }
                } else {
                    config.setUsername(datasourceUsername);
                    config.setPassword(datasourcePassword);
                }
            } catch (URISyntaxException e) {
                config.setJdbcUrl(effectiveUrl);
                config.setUsername(datasourceUsername);
                config.setPassword(datasourcePassword);
            }
        } else {
            config.setJdbcUrl(effectiveUrl);
            config.setUsername(datasourceUsername);
            config.setPassword(datasourcePassword);
        }

        config.setDriverClassName("org.postgresql.Driver");
        return new HikariDataSource(config);
    }
}
