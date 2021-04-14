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
        public DbSet<DiscussionPostLikeRecord> DiscussionPostLikes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<DiscussionPostLikeRecord>()
                .HasKey(c => new { c.DiscussionPostId, c.UserName });
        }

        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();
            return base.SaveChanges();
        }
    }
}
