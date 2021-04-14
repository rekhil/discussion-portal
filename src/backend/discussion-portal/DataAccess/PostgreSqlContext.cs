using DiscussionPortal.Records;
using Microsoft.EntityFrameworkCore;

namespace DiscussionPortal.DataAccess
{
    public class PostgreSqlContext : DbContext
    {
        public PostgreSqlContext(DbContextOptions<PostgreSqlContext> options) : base(options)
        {
        }

        public DbSet<DiscussionPostRecord> DiscussionPosts { get; set; }
        public DbSet<DiscussionPostTagRecords> DiscussionPostTags { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<DiscussionPostTagRecords>()
                .HasOne(p => p.DiscussionPost)
                .WithMany(b => b.Tags)
                .HasForeignKey(p => p.DiscussionPostId);

            builder.Entity<DiscussionPostLikeRecords>()
                .HasOne(p => p.DiscussionPost)
                .WithMany(b => b.Likes)
                .HasForeignKey(p => p.DiscussionPostId);

            base.OnModelCreating(builder);
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();
            return base.SaveChanges();
        }
    }
}
