<strong>Variable:</strong> <?php print $sync_info['variable']; ?><br />
<strong>Originally synced:</strong> <?php print format_date($sync_info['timestamp'], 'medium'); ?><br />
<strong>Synced by:</strong> <?php print $sync_info['name']; ?><br /><br />
<?php foreach($sync_items as $site_name => $sync_item): ?>
  <?php
  $domain = pgc_sync_get_domain_from_sitename($site_name);
  $domain = $domain[$site_name];
  $variable_name = $sync_info['variable'];
  $edit_link = $domain.'/admin/custom-variables/examples';
  ?>
<table>
  <thead>
    <th>Site Name: <?php print $site_name; ?></th>
    <th>Status: <?php print pgc_sync_get_status_string($sync_item['status']); ?></th>
  </thead>
  <tbody>
  <?php if(in_array($sync_item['status'], array(PGC_SYNC_FORCED, PGC_SYNC_SKIPPED, PGC_SYNC_COMPLETED, PGC_SYNC_SUCCESSFUL))):  ?>
    <tr class="no-changes">
      <td><strong>Variable:</strong> <?php print $variable_name; ?></td>
      <td><strong>Status:</strong> <?php print pgc_sync_get_status_string($sync_item['status']); ?></td>
    </tr>
  <?php elseif($sync_item['status'] == PGC_SYNC_FAILED): ?>
    <tr class="overridden top">
      <td><strong>Variable:</strong> <?php print $variable_name; ?></td>
      <td><strong>Status:</strong> <?php print pgc_sync_get_status_string($sync_item['status']); ?></td>
    </tr>
    <tr class="overridden bottom">
      <td colspan="2"><strong>Error:</strong> <?php print $sync_info['error']; ?></td>
    </tr>
  <?php elseif($sync_item['status'] == PGC_SYNC_NEEDS_REVIEW): ?>
    <tr class="overridden top">
      <td><strong>Variable:</strong> <?php print $variable_name; ?></td>
      <td><strong>Status:</strong> <?php print pgc_sync_get_status_string($sync_item['status']); ?></td>
    </tr>
    <tr class="overridden bottom">
      <?php if(strlen($sync_item['value'])): ?>
      <td><strong>Previous value checked:</strong> <?php print $sync_info['old_value']; ?></td>
      <td><strong>Client value:</strong> <?php print $sync_item['value']; ?></td>
      <?php else: ?>
      <td><strong>Previous formula checked:</strong> <?php print $sync_info['old_formula']; ?></td>
      <td><strong>Client formula:</strong> <?php print $sync_item['formula']; ?></td>
      <?php endif; ?>
    </tr>
    <tr>
      <td colspan="2">
        <a href="/admin/pgc-sync/example-variables/force/<?php print $sync_info['id']; ?>/<?php print $site_name; ?>">Force update</a>
        | <a href="/admin/pgc-sync/example-variables/skip/<?php print $sync_info['id']; ?>/<?php print $site_name; ?>">Skip update</a>
        | <a href="/admin/pgc-sync/example-variables/complete/<?php print $sync_info['id']; ?>/<?php print $site_name; ?>">Mark as complete</a>
        | <a href="<?php print $edit_link; ?>" target="_blank">Edit on client site</a>
      </td>
    </tr>
  <?php endif; ?>
  </tbody>
</table>
<?php endforeach; ?>