-- CreateTable
CREATE TABLE "border_fees" (
    "id" SERIAL NOT NULL,
    "cost" INTEGER,
    "country_id" INTEGER,

    CONSTRAINT "border_fees_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "language_id" INTEGER,
    "currency_id" INTEGER,

    CONSTRAINT "country_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currencies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "currencies_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entry_requirements" (
    "id" SERIAL NOT NULL,
    "cost" INTEGER,
    "exceeds_max_days" BOOLEAN NOT NULL DEFAULT false,
    "border_fee_id" INTEGER,
    "visa_type_id" INTEGER,
    "country_id" INTEGER,

    CONSTRAINT "entry_requirements_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flyway_schema_history" (
    "installed_rank" INTEGER NOT NULL,
    "version" VARCHAR(50),
    "description" VARCHAR(200) NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "script" VARCHAR(1000) NOT NULL,
    "checksum" INTEGER,
    "installed_by" VARCHAR(100) NOT NULL,
    "installed_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "execution_time" INTEGER NOT NULL,
    "success" BOOLEAN NOT NULL,

    CONSTRAINT "flyway_schema_history_pk" PRIMARY KEY ("installed_rank")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "languages_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nationalities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "nationalities_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transport_mode_types" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "transport_mode_types_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transport_modes" (
    "id" SERIAL NOT NULL,
    "source_country_id" INTEGER,
    "destination_country_id" INTEGER,
    "transport_mode_type_id" INTEGER,
    "avg_cost" INTEGER NOT NULL,

    CONSTRAINT "transport_modes_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_countries" (
    "id" SERIAL NOT NULL,
    "trip_id" INTEGER,
    "country_id" INTEGER,

    CONSTRAINT "trip_countries_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_transports" (
    "id" SERIAL NOT NULL,
    "cost" INTEGER NOT NULL,
    "trip_id" INTEGER,
    "transport_mode_type_id" INTEGER,

    CONSTRAINT "tansports_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trips" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "users_id" INTEGER,

    CONSTRAINT "trips_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "second_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nationality_id" INTEGER,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visa_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "visa_types_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lodging_types" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "lodging_types_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_lodgings" (
    "id" SERIAL NOT NULL,
    "cost" INTEGER NOT NULL,
    "trip_id" INTEGER,
    "lodging_type_id" INTEGER,

    CONSTRAINT "trip_lodgings_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "flyway_schema_history_s_idx" ON "flyway_schema_history"("success");

-- AddForeignKey
ALTER TABLE "border_fees" ADD CONSTRAINT "border_fees_countries_country_id_fk" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "countries_currencies_currency_id_fk" FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "countries_languages_language_id_fk" FOREIGN KEY ("language_id") REFERENCES "languages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entry_requirements" ADD CONSTRAINT "entry_requirements_border_fees_border_fee_id_fk" FOREIGN KEY ("border_fee_id") REFERENCES "border_fees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entry_requirements" ADD CONSTRAINT "entry_requirements_countries_country_id_fk" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entry_requirements" ADD CONSTRAINT "entry_requirements_visa_types_visa_id_fk" FOREIGN KEY ("visa_type_id") REFERENCES "visa_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transport_modes" ADD CONSTRAINT "transport_modes_countries_destination_country_id_fk" FOREIGN KEY ("destination_country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transport_modes" ADD CONSTRAINT "transport_modes_countries_source_country_id_fk" FOREIGN KEY ("source_country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transport_modes" ADD CONSTRAINT "transport_modes_transport_mode_types_transport_mode_type_id_fk" FOREIGN KEY ("transport_mode_type_id") REFERENCES "transport_mode_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trip_countries" ADD CONSTRAINT "trip_countries_countries_country_id_fk" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trip_countries" ADD CONSTRAINT "trip_countries_trips_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trip_transports" ADD CONSTRAINT "trip_transports_transport_mode_types_transport_mode_type_id_fk" FOREIGN KEY ("transport_mode_type_id") REFERENCES "transport_mode_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trip_transports" ADD CONSTRAINT "trip_transports_trips_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_users_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_nationalities_nationality_id_fk" FOREIGN KEY ("nationality_id") REFERENCES "nationalities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trip_lodgings" ADD CONSTRAINT "trip_lodgings_lodging_types_lodging_type_id_fk" FOREIGN KEY ("lodging_type_id") REFERENCES "lodging_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trip_lodgings" ADD CONSTRAINT "trip_lodgings_trips_trip_id_fk" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
