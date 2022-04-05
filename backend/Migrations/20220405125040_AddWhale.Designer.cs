﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using WhaleSpotting;

namespace WhaleSpotting.Migrations
{
    [DbContext(typeof(WhaleSpottingDbContext))]
    [Migration("20220405125040_AddWhale")]
    partial class AddWhale
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("WhaleSpotting.Models.Database.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<List<string>>("Amenities")
                        .HasColumnType("text[]");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<float>("Latitude")
                        .HasColumnType("real");

                    b.Property<float>("Longitude")
                        .HasColumnType("real");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Sighting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int?>("ApprovedByUserId")
                        .HasColumnType("integer");

                    b.Property<int>("CreatedByUserId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<int>("LocationId")
                        .HasColumnType("integer");

                    b.Property<string>("PhotoUrl")
                        .HasColumnType("text");

                    b.Property<int>("SpeciesId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ApprovedByUserId");

                    b.HasIndex("CreatedByUserId");

                    b.HasIndex("LocationId");

                    b.HasIndex("SpeciesId");

                    b.ToTable("Sightings");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Species", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("EndangeredStatus")
                        .HasColumnType("text");

                    b.Property<string>("LatinName")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("PhotoUrl")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Species");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("HashedPassword")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("Role")
                        .HasColumnType("integer");

                    b.Property<byte[]>("Salt")
                        .HasColumnType("bytea");

                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Whale", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("PhotoUrl")
                        .HasColumnType("text");

                    b.Property<int?>("SpeciesId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("SpeciesId");

                    b.ToTable("Whales");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Sighting", b =>
                {
                    b.HasOne("WhaleSpotting.Models.Database.User", "ApprovedBy")
                        .WithMany()
                        .HasForeignKey("ApprovedByUserId");

                    b.HasOne("WhaleSpotting.Models.Database.User", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedByUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WhaleSpotting.Models.Database.Location", "Location")
                        .WithMany("Sightings")
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WhaleSpotting.Models.Database.Species", "Species")
                        .WithMany()
                        .HasForeignKey("SpeciesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ApprovedBy");

                    b.Navigation("CreatedBy");

                    b.Navigation("Location");

                    b.Navigation("Species");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Whale", b =>
                {
                    b.HasOne("WhaleSpotting.Models.Database.Species", "Species")
                        .WithMany()
                        .HasForeignKey("SpeciesId");

                    b.Navigation("Species");
                });

            modelBuilder.Entity("WhaleSpotting.Models.Database.Location", b =>
                {
                    b.Navigation("Sightings");
                });
#pragma warning restore 612, 618
        }
    }
}
