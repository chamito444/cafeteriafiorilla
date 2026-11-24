
# =============================================
# ETAPA 1: Build
# =============================================
FROM eclipse-temurin:17-jdk AS build

RUN apt-get update \
    && apt-get install -y maven \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -q

COPY src ./src
RUN mvn clean package -DskipTests -q

# =============================================
# ETAPA 2: Runtime
# =============================================
FROM eclipse-temurin:17-jre

WORKDIR /app

# curl para los health checks de ECS
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

# Usuario sin privilegios
RUN groupadd --system --gid 10001 app \
    && useradd --system --uid 10001 --gid app \
       --home-dir /app --shell /usr/sbin/nologin app

# Copiar aplicación
COPY --from=build --chown=app:app \
    /app/target/bdget-0.0.1-SNAPSHOT.jar app.jar

# Puerto de la API
EXPOSE 8080

# Ajuste de memoria para contenedores
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75.0"

# Ejecutar como usuario no root
USER app

ENTRYPOINT ["java", "-jar", "app.jar"]

