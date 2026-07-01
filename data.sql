-- =====================================================
-- Monthly Aggregated Analytics
-- =====================================================

-- Drop existing objects (optional)
DROP MATERIALIZED VIEW IF EXISTS analytics.monthly_aggregated_data_mv;
DROP TABLE IF EXISTS analytics.monthly_aggregated_data;

-- =====================================================
-- Destination Table
-- =====================================================

CREATE TABLE analytics.monthly_aggregated_data
(
    month Date,
    domain_name LowCardinality(String),

    views AggregateFunction(sum, UInt64),
    events AggregateFunction(count),
    unique_users AggregateFunction(uniq, UInt64),
    avg_response_time AggregateFunction(avg, Float64),
    max_response_time AggregateFunction(max, Float64),
    min_response_time AggregateFunction(min, Float64)
)
ENGINE = AggregatingMergeTree
ORDER BY (domain_name, month);

-- =====================================================
-- Materialized View
-- =====================================================

CREATE MATERIALIZED VIEW analytics.monthly_aggregated_data_mv
TO analytics.monthly_aggregated_data
AS
SELECT
    toDate(toStartOfMonth(event_time)) AS month,
    domain_name,

    sumState(count_views) AS views,
    countState() AS events,
    uniqState(user_id) AS unique_users,
    avgState(response_time) AS avg_response_time,
    maxState(response_time) AS max_response_time,
    minState(response_time) AS min_response_time

FROM analytics.hourly_data

GROUP BY
    month,
    domain_name;

-- =====================================================
-- Backfill Existing Data (run once)
-- =====================================================

INSERT INTO analytics.monthly_aggregated_data
SELECT
    toDate(toStartOfMonth(event_time)) AS month,
    domain_name,

    sumState(count_views),
    countState(),
    uniqState(user_id),
    avgState(response_time),
    maxState(response_time),
    minState(response_time)

FROM analytics.hourly_data

GROUP BY
    month,
    domain_name;

-- =====================================================
-- Query Monthly Statistics
-- =====================================================

SELECT
    month,
    domain_name,

    sumMerge(views) AS total_views,
    countMerge(events) AS total_events,
    uniqMerge(unique_users) AS unique_users,
    avgMerge(avg_response_time) AS average_response_time,
    maxMerge(max_response_time) AS maximum_response_time,
    minMerge(min_response_time) AS minimum_response_time

FROM analytics.monthly_aggregated_data

GROUP BY
    month,
    domain_name

ORDER BY
    month,
    domain_name;
